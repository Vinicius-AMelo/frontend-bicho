<template>
    <div class="bg-gray-700 p-8 rounded-sm">
        <div class="flex gap-8 items-end">
            <div class="flex flex-col gap-4 w-[320px]">
                <p v-show="!!mensagem">{{ mensagem }}</p>

                <div class="box flex h-[120px] w-[80px] flex-wrap rounded-sm overflow-hidden">
                    <img class="w-full h-full" src="../../../public/images/17.png" />
                </div>

                <div class="flex w-full gap-1">
                    <TextInput v-model="betValue" class="max-w-[160px]" type="text" />
                    <PrimaryButton
                        class="!w-10 !h-10 text-[20px]"
                        @click="() => betValue > 0 && (betValue = betValue * 0.5)"
                    >
                        ½
                    </PrimaryButton>
                    <PrimaryButton
                        class="!w-10 !h-10"
                        @click="() => betValue > 0 && (betValue = betValue * 2)"
                    >
                        2x
                    </PrimaryButton>
                </div>
                <PrimaryButton
                    :disabled="disabled"
                    class="max-w-max px-4"
                    @click="() => submit(Number(betValue))"
                >
                    Enviar Aposta
                </PrimaryButton>
            </div>

            <div>
                <h2 class="text-center">Sorteio ao vivo</h2>

                <AnimatedCards :numbers="sorteio" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { sorteio, submit } = defineProps<{
    sorteio: number[];
    submit: (betValue: number) => void;
    mensagem: string | null;
    disabled: boolean;
}>();

const betValue = ref<number>(0);
</script>

<style scoped></style>
