import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { isGoogleRecaptchaEnabled } from "./helpers";

export const useGoogleToken = defineStore( "cloudflare-turnstile", () => {
    const siteKey = import.meta.env.VITE_GOOGLE_SITE_KEY;
    const reCaptchaToken = ref(null);
    const WIDGET_CONTAINER = 'reCaptchaContainer';
    const widgetId = ref(null);

    const insertWidget = async () => {
        const grecaptchaContainer = document.getElementById(WIDGET_CONTAINER);

        widgetId.value = await window.grecaptcha.render(grecaptchaContainer, {
            sitekey: siteKey,
            size: "invisible"
        });

        reCaptchaToken.value = await window.grecaptcha.execute(widgetId.value);
    };

    const getToken = async() => {
        if (!isGoogleRecaptchaEnabled()) return;

        if(widgetId.value == null) {
            await insertWidget();
        }

        await window.grecaptcha.reset();
        return await window.grecaptcha.execute(widgetId.value);
    }


    watch(reCaptchaToken, () => {
        console.log("✅ - Google ReCaptcha token was generated");
    });

    return {
        siteKey,
        reCaptchaToken,

        insertWidget,
        getToken,
    };
});
