// const data = [
//   { user: 'A', jumlah: 10 },
//   { user: 'B', jumlah: 5 },
//   { user: 'B', jumlah: 25 },
//   { user: 'A', jumlah: 6 },
//   { user: 'B', jumlah: 9 }
// ]

// let newData = []
// data.forEach((item) => {
//   const sameDataIndex = newData.findIndex((x) => x.user === item.user)
//   if (sameDataIndex >= 0) {
//     newData[sameDataIndex].jumlah += item.jumlah
//   } else {
//     newData.push(item)
//   }
// })
// console.log({ newData })

const jwbstr =
  '306d33c8-181f-449e-a41b-d5d2be2194cf;-;A;=;f5dbec09-0b7f-4b4c-a172-0e21604620f3;-;B;=;e239d934-fbf9-4a13-b0ce-d5893e4bb95b;-;C;=;824eab72-5b0b-49c3-a4b9-9aea172cbe77;-;aaa;=;cd70a6e8-2999-4400-aede-d3a5c7f7b6f0;-;bbb;=;402a4b3f-0aec-4383-8d2f-e4c66addcce3;-;ccc;=;ef6a73b2-49da-4c7d-8c1b-cc4d531788ea;-;ddd;=;db9bec72-e408-413d-97e7-afd8ef5252aa;-;eee;=;e8878c4a-0c20-45a0-8aa6-dc693995a14d;-;012;=;f21c689d-f308-4590-89f6-a821be804ea2;-;234;=;ae5a8db2-36dc-448c-acb5-df3385d45f87;-;456;=;2dfa0a25-bd2b-4fdb-8df1-4e6a5a4b863d;-;678;=;727d3857-12db-4508-bc8e-87d237f38b55;-;04589;=;f593bc31-14fa-4900-8ffb-8c4de4d8ad21;-;v;=;1682b6ff-224d-42c9-83c9-44ba9d2c1f8a;-;v;=;e194b7c7-d94f-4ebe-80b4-c207d29d1d6b;-;x;=;d4a61243-2fd6-48c9-839e-642976898161;-;x;=;af428263-0e3a-471e-b411-035a680564a0;-;v;=;6dfad6d6-26db-4b18-899b-375bef40e444;-;sayur;=;3b0a9811-e6f7-4757-ba91-4f09ab82a8e5;-;sayur;=;e11ec9a9-f711-4538-b344-eae06e9e318b;-;binatang;=;144b85ea-3a26-48c0-bf9d-6ccca209f7ec;-;binatang'

const jwb = jwbstr.split(';=;').map((jwb) => {
  const [id, jawaban] = jwb.split(';-;')
  return { id, jawaban }
})

console.log({ jwb })
