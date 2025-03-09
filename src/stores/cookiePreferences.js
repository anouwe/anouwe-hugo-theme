document.addEventListener('alpine:init', () => {
  Alpine.store('cookiePreferences', {
    preferences: {},
    
    init() {
      const stored = JSON.parse(localStorage.getItem('cookies-settings') || '{}');
      
      if (stored.expiryDate && new Date(stored.expiryDate) < new Date()) {
        localStorage.removeItem('cookies-settings');
        this.setDefaultPreferences();
      } else if (stored.preferences) {
        this.preferences = stored.preferences;
        this.pushToDataLayer(true);
      } else {
        this.setDefaultPreferences();
      }
    },

    setDefaultPreferences() {
      this.preferences = {
        analytics_storage: false,
        ad_storage: false,
        ad_personalization: false,
        ad_user_data: false,
        initialized: true
      };
      this.pushToDataLayer();
    },

    pushToDataLayer(isInit = false) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: isInit ? 'consent_init' : 'consent_update',
          analytics_storage: this.preferences.analytics_storage ? 'granted' : 'denied',
          ad_storage: this.preferences.ad_storage ? 'granted' : 'denied',
          ad_personalization: this.preferences.ad_personalization ? 'granted' : 'denied',
          ad_user_data: this.preferences.ad_user_data ? 'granted' : 'denied'
        });
      }
    },

    showBanner() {
      window.dispatchEvent(new Event('cookie-show-details'));
    },

    consent(consents) {
      this.preferences = {
        ...this.preferences,
        ...consents,
        initialized: true
      };
      this.updatePreferences();
    },

    updatePreferences() {
      const settings = {
        preferences: this.preferences,
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
      };
      localStorage.setItem('cookies-settings', JSON.stringify(settings));
      this.pushToDataLayer();
      window.dispatchEvent(new Event('cookie-preferences-updated'));
    }
  });
});
