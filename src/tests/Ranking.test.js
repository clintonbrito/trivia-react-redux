import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { act } from "react-dom/test-utils";

describe("Testa a página de ranking", () => {
    const STATE = {
        player: {
            ranking: [
                {
                    name: "Joãozinho",
                    score: 10,
                    picture: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                },
                {
                    name: "Teste2",
                    score: 20,
                    picture: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                },
                {
                    name: "Teste3",
                    score: 30,
                    picture: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                },
            ],
                }
                };

    const RANKING_ROUTE = "/ranking";
    it("Testa se a página é renderizada corretamente", () => {
        renderWithRouterAndRedux(<App />, STATE, RANKING_ROUTE);
        const title = screen.queryByTestId("ranking-title");
        expect(title).toBeInTheDocument();
        
    });
    it("Testa se existe um botão de ir para o início e se ele redireciona para a página inicial", () => {
        renderWithRouterAndRedux(<App />, STATE, RANKING_ROUTE);
        const button = screen.queryByTestId("btn-go-home");
        expect(button).toBeInTheDocument();
        act(()=>userEvent.click(button));
    }
    );
});
