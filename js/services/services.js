const postData = async (url, data) => {
   const res = await fetch(url, {
      method: 'POST',
      headers: {//передаём заголовки запроса
         'Content-Type': 'application/json'//передаём заголовок запроса
      },
      body: data //передаём данные запроса
   });
   return await res.json();//получаем ответ от сервера
};


async function getResource(url) {
   let res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   }

   return await res.json();
}

export { postData };
export { getResource };