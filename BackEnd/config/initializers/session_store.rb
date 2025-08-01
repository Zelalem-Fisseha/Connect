# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :cookie_store,
  key: '_connect_session',
  expire_after: 2.weeks,
  secure: Rails.env.production?,
  same_site: :lax,
  httponly: true,
  secure_cookie: Rails.env.production?,
  tld_length: 1

# Ensure cookies are properly serialized
Rails.application.config.action_dispatch.cookies_serializer = :json

# Enable secure cookies in production
Rails.application.config.force_ssl = true if Rails.env.production?

# Configure ActionDispatch::Cookies with secure defaults
Rails.application.config.action_dispatch.cookies_same_site_protection = :lax
Rails.application.config.action_dispatch.cookies_serializer = :json
