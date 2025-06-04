<template>
    <div class="bg-gray-300 p-4 rounded-sm w-[912px] p-8">
        <div class="flex gap-8 h-full">
            <div class="flex flex-col gap-4 w-full">
                <p>{{ `${option != 26 ? 'Animal Selecionado: ' : 'Selecione um animal'}` }}</p>

                <BetSelectorCard :disabled="disabled" :option="option" display />

                <div class="h-4">
                    <p v-show="!!mensagem">{{ mensagem }}</p>
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

            <div class="flex flex-col justify-between border-2 rounded-sm border-b-gray-700 p-4">
                <div>
                    <h2 class="text-center border-b-1 pb-1">Sorteio ao vivo</h2>
                </div>

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
    option: number | null;
}>();

const betValue = ref<number>(0);
</script>

<style scoped></style>
