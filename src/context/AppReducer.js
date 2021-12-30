export const initialState = {
  theme: "dark",
  navState: true,
  mobileState: false,
  consent_form: false,
  consent_form_settings: false,
  consent_necessary: false,
  consent_advertising: false,
  consent_performance: false,
  consent_functional: false,
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value
    }

    case "themeDark":
      return { ...state, theme: "dark" }
    case "themeLight":
      return { ...state, theme: "light" }

    case "openNavigation":
      return { ...state, navState: true }
    case "closeNavigation":
      return { ...state, navState: false }

    case "sizeMobile":
      return { ...state, mobileState: true }
    case "sizeDesktop":
      return { ...state, mobileState: false }

    case "openConsentForm":
      return { ...state, consent_form: true }
    case "closeConsentForm":
      return { ...state, consent_form: false }

    case "openConsentFormSettings":
      return { ...state, consent_form_settings: true }
    case "closeConsentFormSettings":
      return { ...state, consent_form_settings: false }

    case "acceptConsentNecessary":
      return { ...state, consent_necessary: true }
    case "revokeConsentNecessary":
      return { ...state, consent_necessary: false }

    case "acceptConsentAdvertising":
      return { ...state, consent_advertising: true }
    case "revokeConsentAdvertising":
      return { ...state, consent_advertising: false }

    case "acceptConsentPerformance":
      return { ...state, consent_performance: true }
    case "revokeConsentPerformance":
      return { ...state, consent_performance: false }

    case "acceptConsentFunctional":
      return { ...state, consent_functional: true }
    case "revokeConsentFunctional":
      return { ...state, consent_functional: false }

    case "acceptConsentAll":
      return {
        ...state,
        consent_form: false,
        consent_form_settings: false,
        consent_necessary: true,
        consent_advertising: true,
        consent_performance: true,
        consent_functional: true,
      }
    case "revokeConsentAll":
      return {
        ...state,
        consent_form: true,
        consent_necessary: false,
        consent_advertising: false,
        consent_performance: false,
        consent_functional: false,
      }

    default:
      return state
  }
}
