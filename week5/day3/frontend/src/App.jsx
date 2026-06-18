import Card from "./components/Card";

function App() {
  return (
    <>
      {/* <Header/> */}
      <main className="flex flex-col md:flex-row gap-4 justify-center items-center">

        <Card
          name="Conquerer mateen"
          age={5}
          dept="Engineering"
          city="Duhok"
        />

        <Card
          name="Lord Snow"
          age={7}
          dept="Science"
          city="Duhok"
        > Test </Card>

      </main>
      {/* <Footer/> */}
    </>
  );
}

export default App