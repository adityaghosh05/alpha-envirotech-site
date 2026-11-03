<?php
/**
 * Alpha Envirotech WordPress theme bootstrap.
 *
 * The theme serves the static site built from the React project. Edit the
 * project source, then rebuild the installable theme to publish content or
 * design changes.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
});

function alpha_envirotech_render_static_site()
{
    if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return;
    }

    $request_path = parse_url(isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/', PHP_URL_PATH);
    $request_path = rawurldecode(is_string($request_path) ? $request_path : '/');

    if (preg_match('#^/(wp-admin|wp-login\.php|wp-json|wp-cron\.php)(/|$)#', $request_path)) {
        return;
    }

    $site_root = realpath(__DIR__ . '/site');
    if (!$site_root) {
        return;
    }

    $relative_path = trim($request_path, '/');
    $candidates = array();

    if ($relative_path === '') {
        $candidates[] = $site_root . '/index.html';
    } else {
        // Existing public assets, such as robots.txt, are served directly.
        $candidates[] = $site_root . '/' . $relative_path;
        $candidates[] = $site_root . '/' . $relative_path . '.html';
        $candidates[] = $site_root . '/' . $relative_path . '/index.html';
    }

    $file = false;
    foreach ($candidates as $candidate) {
        $resolved = realpath($candidate);
        if ($resolved && strpos($resolved, $site_root . DIRECTORY_SEPARATOR) === 0 && is_file($resolved)) {
            $file = $resolved;
            break;
        }
    }

    $is_not_found = false;
    if (!$file) {
        $file = realpath($site_root . '/404.html');
        $is_not_found = true;
    }

    if (!$file || !is_file($file)) {
        return;
    }

    status_header($is_not_found ? 404 : 200);

    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    $mime_types = array(
        'css' => 'text/css; charset=utf-8',
        'html' => 'text/html; charset=utf-8',
        'js' => 'text/javascript; charset=utf-8',
        'json' => 'application/json; charset=utf-8',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'webp' => 'image/webp',
        'svg' => 'image/svg+xml',
        'pdf' => 'application/pdf',
        'mp4' => 'video/mp4',
        'woff2' => 'font/woff2',
        'rsc' => 'text/x-component; charset=utf-8',
        'txt' => 'text/plain; charset=utf-8',
        'xml' => 'application/xml; charset=utf-8',
    );
    $content_type = isset($mime_types[$extension]) ? $mime_types[$extension] : 'application/octet-stream';

    header('Content-Type: ' . $content_type);
    header('X-Content-Type-Options: nosniff');
    if ($extension === 'html') {
        header('Cache-Control: private, no-store, max-age=0');
        $html = file_get_contents($file);
        $theme_site_url = trailingslashit(get_stylesheet_directory_uri()) . 'site';
        $html = str_replace('/__AEC_THEME_SITE__', esc_url_raw($theme_site_url), $html);
        $html = str_replace('__AEC_TURNSTILE_SITE_KEY__', esc_js(alpha_envirotech_setting('turnstile_site_key', 'AEC_TURNSTILE_SITE_KEY')), $html);
        echo $html;
    } else {
        $relative_file = ltrim(substr($file, strlen($site_root)), DIRECTORY_SEPARATOR);
        if (strpos($relative_file, '_next/static/') === 0) {
            header('Cache-Control: public, max-age=31536000, immutable');
        } else {
            header('Cache-Control: public, max-age=3600');
        }
        readfile($file);
    }
    exit;
}
add_action('template_redirect', 'alpha_envirotech_render_static_site', 0);

/** Return a server-only integration setting, allowing wp-config overrides. */
function alpha_envirotech_setting($name, $constant)
{
    if (defined($constant) && constant($constant)) {
        return trim((string) constant($constant));
    }
    $settings = get_option('alpha_envirotech_integrations', array());
    return isset($settings[$name]) ? trim((string) $settings[$name]) : '';
}

add_action('admin_menu', function () {
    add_options_page('AEC Form Integrations', 'AEC Form Integrations', 'manage_options', 'alpha-envirotech-integrations', 'alpha_envirotech_integrations_page');
});

add_action('admin_init', function () {
    register_setting('alpha_envirotech_integrations_group', 'alpha_envirotech_integrations', array(
        'type' => 'array',
        'sanitize_callback' => function ($input) {
            $current = get_option('alpha_envirotech_integrations', array());
            $result = is_array($current) ? $current : array();
            $fields = array('turnstile_site_key', 'turnstile_secret_key', 'resend_api_key', 'from_email', 'recipients');
            foreach ($fields as $field) {
                if (!isset($input[$field])) continue;
                $value = trim((string) $input[$field]);
                // Empty password fields mean “keep the currently saved key”.
                if (in_array($field, array('turnstile_secret_key', 'resend_api_key'), true) && $value === '') continue;
                $result[$field] = sanitize_text_field($value);
            }
            if (!empty($result['from_email'])) $result['from_email'] = sanitize_text_field($result['from_email']);
            if (!empty($result['recipients'])) $result['recipients'] = sanitize_text_field($result['recipients']);
            return $result;
        },
    ));
});

function alpha_envirotech_integrations_page()
{
    if (!current_user_can('manage_options')) return;
    $settings = get_option('alpha_envirotech_integrations', array());
    $value = function ($name) use ($settings) { return esc_attr(isset($settings[$name]) ? $settings[$name] : ''); };
    ?>
    <div class="wrap">
      <h1>AEC Form Integrations</h1>
      <p>These credentials stay on the WordPress server. Configure Cloudflare Turnstile and Resend before enabling public submissions. For production, use live Turnstile keys registered for your website domain.</p>
      <form method="post" action="options.php">
        <?php settings_fields('alpha_envirotech_integrations_group'); ?>
        <table class="form-table" role="presentation">
          <tr><th><label for="aec-site-key">Turnstile site key</label></th><td><input id="aec-site-key" class="regular-text" name="alpha_envirotech_integrations[turnstile_site_key]" value="<?php echo $value('turnstile_site_key'); ?>" autocomplete="off"></td></tr>
          <tr><th><label for="aec-secret">Turnstile secret key</label></th><td><input id="aec-secret" type="password" class="regular-text" name="alpha_envirotech_integrations[turnstile_secret_key]" value="" autocomplete="new-password"><p class="description"><?php echo !empty($settings['turnstile_secret_key']) ? 'A secret is saved. Leave blank to keep it.' : 'Required. Stored on the server and never included in page HTML.'; ?></p></td></tr>
          <tr><th><label for="aec-resend">Resend API key</label></th><td><input id="aec-resend" type="password" class="regular-text" name="alpha_envirotech_integrations[resend_api_key]" value="" autocomplete="new-password"><p class="description"><?php echo !empty($settings['resend_api_key']) ? 'A key is saved. Leave blank to keep it.' : 'Required for sending form emails.'; ?></p></td></tr>
          <tr><th><label for="aec-from">Sender</label></th><td><input id="aec-from" class="regular-text" name="alpha_envirotech_integrations[from_email]" value="<?php echo $value('from_email'); ?>" placeholder="Alpha Envirotech Website &lt;inquiries@your-domain.com&gt;"></td></tr>
          <tr><th><label for="aec-recipients">Recipients</label></th><td><input id="aec-recipients" class="regular-text" name="alpha_envirotech_integrations[recipients]" value="<?php echo $value('recipients'); ?>" placeholder="info@example.com, applications@example.com"><p class="description">Comma-separated email addresses.</p></td></tr>
        </table>
        <?php submit_button('Save integration settings'); ?>
      </form>
    </div>
    <?php
}

add_action('rest_api_init', function () {
    register_rest_route('aenviro/v1', '/inquiries', array(
        'methods' => 'POST',
        'callback' => 'alpha_envirotech_receive_inquiry',
        'permission_callback' => '__return_true',
    ));
});

function alpha_envirotech_receive_inquiry($request)
{
    $raw = $request->get_body();
    if (strlen($raw) > 20000) return new WP_Error('payload_too_large', 'This submission is too large.', array('status' => 413));
    $data = $request->get_json_params();
    if (!is_array($data)) return new WP_Error('invalid_submission', 'Please check the form and try again.', array('status' => 400));
    $get = function ($key, $max = 3000) use ($data) {
        $value = isset($data[$key]) && is_scalar($data[$key]) ? (string) $data[$key] : '';
        return trim(substr(sanitize_textarea_field($value), 0, $max));
    };
    $form_type = $get('formType', 20);
    $first = $get('firstName', 80); $last = $get('lastName', 80);
    $email = sanitize_email($get('email', 200)); $phone = $get('phone', 40);
    $message = $get('message', 3000); $token = $get('turnstileToken', 2048);
    $submission_id = $get('submissionId', 80); $website = $get('website', 200);
    $organization = $get('organization', 160); $school = $get('school', 160);
    $major = $get('major', 120); $year = $get('year', 80);
    if ($website !== '') return rest_ensure_response(array('ok' => true));
    if (!in_array($form_type, array('contact', 'internship'), true) || !$first || !$last || !is_email($email) || !$token || !preg_match('/^[a-zA-Z0-9-]{8,80}$/', $submission_id)) {
        return new WP_Error('invalid_submission', 'Please check the required fields and try again.', array('status' => 400));
    }
    if ($form_type === 'internship' ? (!$school || !$major || !$year) : (!$organization || strlen($message) < 10)) {
        return new WP_Error('missing_fields', 'Please complete all required fields and try again.', array('status' => 400));
    }

    $site_key = alpha_envirotech_setting('turnstile_site_key', 'AEC_TURNSTILE_SITE_KEY');
    $secret = alpha_envirotech_setting('turnstile_secret_key', 'AEC_TURNSTILE_SECRET_KEY');
    $resend_key = alpha_envirotech_setting('resend_api_key', 'AEC_RESEND_API_KEY');
    $from = alpha_envirotech_setting('from_email', 'AEC_CONTACT_FROM_EMAIL');
    $recipients_raw = alpha_envirotech_setting('recipients', 'AEC_CONTACT_RECIPIENTS');
    $recipients = array_filter(array_map('sanitize_email', explode(',', $recipients_raw)), 'is_email');
    if (!$site_key || !$secret || ((!$resend_key || !$from || !$recipients) && wp_get_environment_type() !== 'local')) {
        return new WP_Error('form_not_configured', 'This form is temporarily unavailable. Please call 904.382.0083 or email info@aenvirotech.com.', array('status' => 503));
    }

    $verification = wp_remote_post('https://challenges.cloudflare.com/turnstile/v0/siteverify', array(
        'timeout' => 12,
        'body' => array('secret' => $secret, 'response' => $token, 'idempotency_key' => $submission_id),
    ));
    if (is_wp_error($verification) || wp_remote_retrieve_response_code($verification) !== 200) {
        return new WP_Error('verification_unavailable', 'Verification could not be completed. Please try again.', array('status' => 502));
    }
    $verified = json_decode(wp_remote_retrieve_body($verification), true);
    $verified_action = isset($verified['action']) ? $verified['action'] : '';
    $valid_action = $verified_action === 'project_inquiry' || (wp_get_environment_type() === 'local' && $verified_action === 'test');
    if (empty($verified['success']) || !$valid_action) {
        return new WP_Error('verification_failed', 'Please complete the spam verification and try again.', array('status' => 400));
    }
    // Local previews can exercise CAPTCHA end-to-end without sending real email.
    if (wp_get_environment_type() === 'local' && (!$resend_key || !$from || !$recipients)) {
        return rest_ensure_response(array('ok' => true, 'preview' => true));
    }

    $title = $form_type === 'internship' ? 'New internship application' : 'New website message';
    $subject = $form_type === 'internship' ? "[AEC website] Internship application from $first $last" : "[AEC website] Message from $first $last — $organization";
    $fields = $form_type === 'internship'
        ? array('Name' => "$first $last", 'Email' => $email, 'School' => $school, 'Major / field of study' => $major, 'Year in school' => $year, 'Phone' => $phone ?: 'Not provided')
        : array('First name' => $first, 'Last name' => $last, 'Organization' => $organization, 'Email' => $email);
    $body = '<div style="font-family:Arial,sans-serif;color:#17251f;line-height:1.5"><h1 style="color:#081838">' . esc_html($title) . '</h1><table style="border-collapse:collapse">';
    foreach ($fields as $label => $value) $body .= '<tr><th style="text-align:left;padding:6px 16px 6px 0">' . esc_html($label) . '</th><td style="padding:6px 0">' . esc_html($value) . '</td></tr>';
    $extra = $form_type === 'internship' ? 'Additional information' : 'Message';
    if ($message !== '') $body .= '</table><h2>' . esc_html($extra) . '</h2><p style="white-space:pre-wrap">' . nl2br(esc_html($message)) . '</p></div>';
    else $body .= '</table></div>';
    $sent = wp_remote_post('https://api.resend.com/emails', array(
        'timeout' => 15,
        'headers' => array('Authorization' => 'Bearer ' . $resend_key, 'Content-Type' => 'application/json', 'Idempotency-Key' => 'aec_inquiry_' . $submission_id),
        'body' => wp_json_encode(array('from' => $from, 'to' => array_values($recipients), 'reply_to' => $email, 'subject' => $subject, 'html' => $body)),
    ));
    if (is_wp_error($sent) || wp_remote_retrieve_response_code($sent) < 200 || wp_remote_retrieve_response_code($sent) >= 300) {
        return new WP_Error('delivery_failed', 'We could not send your message just now. Please try again or email info@aenvirotech.com.', array('status' => 502));
    }
    return rest_ensure_response(array('ok' => true));
}
