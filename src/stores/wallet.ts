// stores/wallet.ts
import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    balance: 0.00, // Saldo inicial
  }),
  actions: {
    deposit(amount: number) {
      if (amount > 0) {
        this.balance += amount;
        console.log(`Depositado: ${amount}. Novo saldo: ${this.balance}`);
      }
    },
    // Você poderia adicionar outras ações como withdraw(amount), setBalance(newBalance), etc.
  },
  getters: {
    // Getter para formatar o saldo, se necessário
    formattedBalance: (state) => {
      return state.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },
});
