# Perbedaan `composable` dan `utils` pada Project Vue.js

Dalam proyek Vue.js modern (dengan Composition API), istilah `composable` dan `utils` sering digunakan untuk membagi logika kode. Meskipun sama-sama berupa fungsi, keduanya memiliki tujuan dan konteks penggunaan yang berbeda.

---

## 🔹 1. Composable

- **Tujuan**: Mengelola **state reaktif**, **lifecycle**, atau **logic yang berhubungan dengan Vue**.
- **Digunakan dalam**: `setup()` function (Composition API).
- **Ciri khas**:
  - Menggunakan fitur Vue seperti `ref`, `reactive`, `computed`, `watch`, `onMounted`, dll.
  - Namanya biasanya diawali dengan `use`.
- **Contoh penggunaan**:

```ts
// composables/useCounter.ts
import { ref } from "vue";

export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}
```

---

## 🔹 2. Utils (Utilities)

- **Tujuan**: Menyediakan fungsi **murni** (stateless) yang tidak bergantung pada Vue.
- **Digunakan dalam**: Seluruh bagian proyek (Vue atau non-Vue).
- **Ciri khas**:
  - Tidak menggunakan API Vue.
  - Dapat digunakan juga di sisi server (misalnya pada API, Node.js).
- **Contoh penggunaan**:

```ts
// utils/formatCurrency.ts
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}
```

---

## 🧠 Tabel Perbandingan

| Aspek        | Composables                         | Utils                                     |
| ------------ | ----------------------------------- | ----------------------------------------- |
| Terkait Vue? | Ya (ref, reactive, watch, dsb)      | Tidak                                     |
| Nama         | `useSomething()`                    | Bebas (`formatSomething`, `slugify`, dll) |
| Contoh       | `useAuth`, `useCounter`, `useFetch` | `formatDate`, `toRupiah`, `capitalize`    |
| Dependency   | Vue APIs (Composition API)          | JS murni                                  |

---

## ✅ Kesimpulan

Gunakan **`composables`** untuk logika yang bergantung pada Vue dan reaktivitas, dan gunakan **`utils`** untuk fungsi-fungsi murni yang tidak terkait dengan Vue.
