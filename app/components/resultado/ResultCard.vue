<template>
    <div style="
        width: 1080px;
        height: 1920px;
        background-color: #FEFEFE;
        color: #161616;
        font-family: 'Saira', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 96px 120px 96px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        gap: 64px;
    ">
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 16px;">
            <img
                src="/images/resultado/Logo-Sika.png"
                alt="Sika"
                crossorigin="anonymous"
                width="100"
                height="100"
                style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 16px;"
            />
            <div style="display: flex; align-items: center;">
                <img
                    src="/images/resultado/Logo-Klaukol.png"
                    alt="Klaukol"
                    crossorigin="anonymous"
                    width="160"
                    height="40"
                    style="width: 160px; height: 40px; object-fit: contain; margin-right: 48px;"
                />
                <img
                    src="/images/resultado/Logo-Revear.png"
                    alt="Revear"
                    crossorigin="anonymous"
                    width="180"
                    height="40"
                    style="width: 180px; height: 40px; object-fit: contain;"
                />
            </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 48px; width: 100%;">

            <p
                v-if="variant === 'full' && userName"
                style="font-size: 40px; color: #8C8C8C; font-weight: 400; margin: 0;"
            >
                {{ userName }}, sos un...
            </p>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 24px;">
                <p style="font-size: 140px; line-height: 1; margin: 0;">{{ archetype.emoji }}</p>

                <h1 style="
                    font-size: 96px;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #FCC500;
                    letter-spacing: -0.01em;
                    line-height: 1;
                    margin: 0;
                ">{{ archetype.name }}</h1>

                <p style="
                    font-size: 44px;
                    font-weight: 600;
                    color: #FCC500;
                    font-style: italic;
                    margin: 0;
                ">"{{ archetype.claim }}"</p>

                <p
                    v-if="variant === 'full'"
                    style="
                        font-size: 34px;
                        color: #161616;
                        max-width: 860px;
                        line-height: 1.6;
                        margin: 0;
                        text-align: center;
                    "
                >{{ archetype.description }}</p>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 24px; width: 100%;">
                <p style="font-size: 28px; color: #8C8C8C; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0;">
                    Tus fortalezas
                </p>
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; flex-wrap: wrap;">
                    <span
                        v-for="strength in archetype.strengths"
                        :key="strength"
                        style="
                            display: flex;
                            align-items: center;
                            background-color: rgba(162,162,162,0.2);
                            border-radius: 9999px;
                            padding: 10px 36px 10px 10px;
                            font-size: 32px;
                            font-weight: 500;
                            white-space: nowrap;
                            margin: 0 8px 16px 8px;
                        "
                    >
                        <span style="
                            width: 48px;
                            height: 48px;
                            min-width: 48px;
                            background-color: #FCC500;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13l4 4L19 7" stroke="#161616" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span style="margin-left: 14px; padding-bottom: 6px;">{{ strength }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    archetype: { type: Object, required: true },
    userName: { type: String, default: '' },
    variant: { type: String, default: 'full' },
})
</script>
