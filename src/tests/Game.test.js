import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "../pages/Game";
import App from "../App";
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

const STATE = {
    player: {

        name: "Joaquim",
        assertions: 0,
        score: 0,
        seconds: 30,
        gravatarEmail: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        ranking: [],
    },

};

describe("Testa a página de jogo", () => {

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

const GAME_ROUTE = "/game";
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
        for (let i = 1; i < 30; i += 1) {
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

    it('Testa se o game é finalizado com as respostas', async () => {
        const { history } = renderWithRouterAndRedux(<App />, STATE, GAME_ROUTE);
        const name = screen.getByText(/Joaquim/i);
        expect(name).toBeInTheDocument();

        await waitFor(() => {
            const question = screen.getByTestId('question-text');
            expect(question).toBeInTheDocument();
        });
        // 36,65,83-84,142,209 

        const answers = screen.getAllByTestId(/wrong-answer/i);
        expect(answers.length).toBe(3);

        const correctAnswer = await screen.findByTestId(/correct-answer/i);
        userEvent.click(correctAnswer);

        const nextButton = screen.getByTestId(/btn-next/i);
        act(() => userEvent.click(nextButton));

        for (let i = 1; i < 5; i += 1) {
            const correctAnswer = await screen.findByTestId(/correct-answer/i);
            userEvent.click(correctAnswer);
            const nextButton = await screen.findByTestId(/btn-next/i);
            act(() => userEvent.click(nextButton));
        }

        expect(history.location.pathname).toBe('/feedback');
    });

    it('Verifica se redireciona para a página inicial quando a API retorna response_code !== 0', async () => {
        jest.clearAllMocks();
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                response_code: 1,
            }),
        });
        const { history } = renderWithRouterAndRedux(<App />, STATE, GAME_ROUTE);

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
    });

    it('Verifica se questions é buscado da API', async () => {
        const differentTimeState = {
            player: {
                name: "Joaquim",
                assertions: 0,
                score: 0,
                seconds: 0,
            },
        };
        const { history } = renderWithRouterAndRedux(<App />, STATE, GAME_ROUTE);
        expect(global.fetch).toHaveBeenCalled();

        await waitFor(() => {
            expect(history.location.pathname).toBe('/game');
        }
        );
        const wrongAnswer = await screen.findAllByTestId(/wrong-answer/i);
        expect(wrongAnswer).toHaveLength(3);
        userEvent.click(wrongAnswer[0]);

        const question = await screen.findByTestId('question-text');
        expect(question).toBeInTheDocument();

        const correctAnswer = await screen.findByTestId(/correct-answer/i);
        userEvent.click(correctAnswer);
    });

});


describe('Testa o Timer', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });
    jest.spyOn(console, 'log').mockImplementation();
    it('deve chamar o método getTimer corretamente', () => {
        const { store } = renderWithRouterAndRedux(<App />, STATE, GAME_ROUTE);

        act(() => {
            jest.advanceTimersByTime(1000);
        })

        const name = screen.getByText(/Joaquim/i);
        expect(name).toBeInTheDocument();
        expect(store.getState().player.seconds).toBe(29);        
    });
});


