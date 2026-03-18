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
        justify-content: flex-start;
        padding: 96px 120px 96px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        gap: 64px;
    ">
        <!-- Top: brand logos -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <img
                src="/images/Logo-Sika.svg"
                alt="Sika"
                crossorigin="anonymous"
                style="height: 120px; width: auto; object-fit: contain;"
            />
            <div style="display: flex; align-items: center; gap: 32px;">
                <img
                    src="/images/Logo-Klaukol.svg"
                    alt="Klaukol"
                    crossorigin="anonymous"
                    style="height: 54px; width: auto; object-fit: contain;"
                />
                <img
                    src="/images/Logo-Revear.svg"
                    alt="Revear"
                    crossorigin="anonymous"
                    style="height: 54px; width: auto; object-fit: contain;"
                />
            </div>
        </div>

        <!-- Main content -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 48px; width: 100%;">

            <!-- User name — only in full variant -->
            <p
                v-if="variant === 'full' && userName"
                style="font-size: 40px; color: #8C8C8C; font-weight: 400; margin: 0;"
            >
                {{ userName }}, sos un...
            </p>

            <!-- Emoji + archetype name + claim -->
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

                <!-- Description — only in full variant -->
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

            <!-- Strengths -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 24px; width: 100%;">
                <p style="font-size: 28px; color: #8C8C8C; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0;">
                    Tus fortalezas
                </p>
                <div style="display: block; text-align: center; width: 100%;">
                    <span
                        v-for="strength in archetype.strengths"
                        :key="strength"
                        style="
                            display: inline-flex;
                            align-items: center;
                            gap: 14px;
                            background-color: rgba(162,162,162,0.2);
                            border-radius: 9999px;
                            padding: 10px 36px 10px 10px;
                            font-size: 32px;
                            font-weight: 500;
                            margin: 8px;
                        "
                    >
                        <span style="
                            width: 48px;
                            height: 48px;
                            background-color: #FCC500;
                            border-radius: 50%;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                        ">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13l4 4L19 7" stroke="#161616" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        {{ strength }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Archetype {
    id: string
    emoji: string
    name: string
    claim: string
    description: string
    strengths: string[]
}

withDefaults(defineProps<{
    archetype: Archetype
    userName?: string
    variant?: 'full' | 'minimal'
}>(), {
    userName: '',
    variant: 'full',
})
</script>
