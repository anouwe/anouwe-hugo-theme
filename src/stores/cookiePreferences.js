document.addEventListener('alpine:init', () => {
  Alpine.store('cookiePreferences', {
    preferences: JSON.parse(
      localStorage.getItem('cookies-preferences') || '{}'
    ),

    init() {
      const stored = JSON.parse(
        localStorage.getItem('cookies-settings') || '{}'
      )
      if (stored.expiryDate && new Date(stored.expiryDate) < new Date()) {
        localStorage.removeItem('cookies-settings')
        localStorage.removeItem('cookies-banner')
      }
      if (!this.preferences.initialized) {
        this.preferences = {
          analytics_storage: false,
          ad_storage: false,
          ad_personalization: false,
          ad_user_data: false,
          initialized: true,
        }
      }
    },

    acceptAll() {
      this.preferences = {
        analytics_storage: true,
        ad_storage: true,
        ad_personalization: true,
        ad_user_data: true,
        initialized: true,
      }
      this.updatePreferences()
    },

    rejectAll() {
      this.preferences = {
        analytics_storage: false,
        ad_storage: false,
        ad_personalization: false,
        ad_user_data: false,
        initialized: true,
      }
      this.updatePreferences()
    },

    updatePreferences() {
      const preferences = {
        ...this.preferences,
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 180 jours
    };
    
    localStorage.setItem('cookies-settings', JSON.stringify(preferences));
    document.cookie = `cookie-consent=${JSON.stringify(this.preferences)};max-age=${180*24*60*60};path=/;SameSite=None;Secure`;
    
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'consent',
        consent: {
          update: {
            analytics_storage: this.preferences.analytics_storage ? 'granted' : 'denied',
            ad_storage: this.preferences.ad_storage ? 'granted' : 'denied',
            ad_personalization: this.preferences.ad_personalization ? 'granted' : 'denied',
            ad_user_data: this.preferences.ad_user_data ? 'granted' : 'denied'
          }
        }
      });
    }

    if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
            'analytics_storage': this.preferences.analytics_storage ? 'granted' : 'denied',
            'ad_storage': this.preferences.ad_storage ? 'granted' : 'denied',
            'ad_personalization': this.preferences.ad_personalization ? 'granted' : 'denied',
            'ad_user_data': this.preferences.ad_user_data ? 'granted' : 'denied'
        });
    }
    
    localStorage.setItem('cookies-banner', 'true');
      window.dispatchEvent(new Event('cookie-preferences-updated'))
    },
    showBanner() {
      localStorage.removeItem('cookies-banner');
      window.dispatchEvent(new Event('cookie-preferences-updated'));
      window.dispatchEvent(new Event('cookie-show-details'));
  },
  })
})
