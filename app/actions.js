"use server";

export async function wakeUpServer() {
  "use server";
  const { signal } = new AbortController();
  await fetch(
    `${process.env.APP_URL}/wakeUp`,
    {
      method: "GET",
    },
    { signal }
  );
}
