const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((res) => res.json())
        .then((data) => resolve(data));
    }, timeout);
  });
};
export const SlowComponent = async () => {
  const data: any = await wait(5000);

  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};
