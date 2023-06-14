import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../pages/Game";
import mockData from "./helpers/mockData";
import { act } from "react-dom/test-utils";
import Timer from "../components/Timer";


beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData)
    });
});
afterEach(() => {
    global.fetch.mockClear();
});

describe("Testa a página de jogo", () => {
    const STATE = {
        player: {
            name: "Joaquim",
            assertions: 0,
            score: 0,
            gravatarEmail: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            ranking: [],
        },
    };

    const GAME = "/game";
    it('Testa se a página é renderizada corretamente', async () => {
        renderWithRouterAndRedux(<Game />, STATE);
        const name = screen.getByText(/Joaquim/i);
        expect(name).toBeInTheDocument();

        await waitFor(() => {
            const question = screen.getByTestId('question-text');
            expect(question).toBeInTheDocument();
        });

        const answers = screen.getAllByTestId(/wrong-answer/i);
        const correctAnswer = screen.getByTestId(/correct-answer/i);
        expect(answers.length).toBe(3);
        expect(correctAnswer).toBeInTheDocument();
        userEvent.click(correctAnswer);

        const nextButton = screen.getByTestId(/btn-next/i);
        act(() => userEvent.click(nextButton));

        await waitFor(() => {
            const question = screen.getByTestId('question-text');
            expect(question).toBeInTheDocument();
        });

        await waitFor(() => {
            const correctAnswer = screen.getByTestId(/correct-answer/i);
            expect(correctAnswer).toBeInTheDocument();
            userEvent.click(correctAnswer);
            userEvent.click(nextButton);
        });
    });
});

describe("Testa o Timer", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it("deve diminuir o tempo em 1 a cada segundo", async () => {
        const { getByText } = renderWithRouterAndRedux(<Timer />);
        for(let i = 1; i < 30; i += 1) {
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(getByText(/Timer:/)).toHaveTextContent(`Timer: ${30 - i}`);
    }
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(getByText(/Timer:/)).toHaveTextContent("Timer: 0");

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(getByText(/Timer:/)).toHaveTextContent("Timer: 0");

    });
});

