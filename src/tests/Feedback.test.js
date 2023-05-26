import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { act } from "react-dom/test-utils";
describe("Testa a página de feedback", () => {
    const STATE = {
        player: {
            name: "Joaquim",
            assertions: 4,
            score: 100,
            gravatarEmail: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            ranking: [],
        },
    };

 const BAD_ASSERTIONS_STATE = {
        player: {
            name: "Joaquim",
            assertions: 2,
            score: 0,
            gravatarEmail: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            ranking: [],
        },
    };
    const FEEDBACK_ROUTE = "/feedback";

    it("Testa se a página é renderizada corretamente", () => {
        renderWithRouterAndRedux(<App />, BAD_ASSERTIONS_STATE, FEEDBACK_ROUTE);
        const feedbackMessage = screen.queryByTestId("feedback-text");
        expect(feedbackMessage).toBeInTheDocument();
        expect(feedbackMessage).toHaveTextContent("Could be better...");
    });
    
    it("TEsta se a mensagem 'Could be better...' é renderizada quando o número de acertos é menor que 3", () => {
        renderWithRouterAndRedux(<App />, STATE, FEEDBACK_ROUTE);
        const feedbackMessage = screen.queryByTestId("feedback-text");
        expect(feedbackMessage).toBeInTheDocument();
        expect(feedbackMessage).toHaveTextContent("Well Done!");
    });
    
    it("Testa se existe um botão de ir para o ranking e se ele redireciona para a página de ranking", () => {
        renderWithRouterAndRedux(<App />, STATE, FEEDBACK_ROUTE);
        const button = screen.queryByTestId("btn-ranking");
        expect(button).toBeInTheDocument();

        act(()=>userEvent.click(button));
    }
    );

    it("Testa se existe um botão de jogar novamente e se ele redireciona para a página inicial", () => {
        renderWithRouterAndRedux(<App />, STATE, FEEDBACK_ROUTE);
        const button = screen.queryByTestId("btn-play-again");
        expect(button).toBeInTheDocument();

        act(()=>userEvent.click(button));
    }
    );
});