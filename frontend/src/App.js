import "./App.css";
import "bulma/css/bulma.min.css";
import ContactList from "./components/ContactList";
import Form from "./components/ContactForm";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="colums">
          <div className="column">
            <section className="hero is-primary">
              <div className="hero-body">
                <p className="title">Contact Book</p>
                <p className="subtitle">Zhi You's OTOT Task B Application!</p>
              </div>
            </section>
            <h1 className="title">Add Contact</h1>
            <Form />
            <h1 className="title">Contacts</h1>

            <ContactList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
