import { fireEvent, render, screen } from "@testing-library/react";
// import { useData } from "../../contexts/DataContext";
// import { number } from "prop-types";
import Home from "./index";

// Mock the useData hook
jest.mock("../../contexts/DataContext", () => ({
  useData: () => ({
    last: {
      cover: "/images/headway-F2KRf_QfCqw-unsplash.png",
      title: "Last Event Title",
      date: "2022-08-29T20:28:45.744Z",
    },
  }),
}));

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});


describe("When a page is created", () => {
  it("a list of events is displayed", async() => {
    // to implement
    render(<Home />);
    const events = await screen.findAllByTestId("card-testid");
    expect(events.length).toBeGreaterThan(0); // Replace with the expected length
  })
      
  it("a list a people is displayed", async () => {
    // to implement
    render(<Home />); 
    const people = await screen.findAllByText(/Samira|Jean-baptiste|Alice|Luís|Christine|Isabelle/i); // All possible names); 
    expect(people.length).toBeGreaterThan(0);
  })
  it("a footer is displayed", () => {
    // to implement
    render(<Home />); 
    expect(screen.getByText("Notre dernière prestation")).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />); 

    expect(screen.getByTestId("card-testid")).toBeInTheDocument();
    const images = screen.getAllByTestId("card-image-testid");
    expect(images.length).toBeGreaterThan(0); // Check if any image is present
    expect(screen.getByText("Last Event Title")).toBeInTheDocument();
    // expect(screen.getByText("24-25-26 Février")).toBeInTheDocument();
  });
});

