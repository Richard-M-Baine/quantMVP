import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  Route: ({ element }) => element,
  Routes: ({ children }) => <>{Array.isArray(children) ? children[0] : children}</>,
}), { virtual: true });

jest.mock('./components/Home', () => () => <main>Quant Justice landing</main>);
jest.mock('./components/County/CountyLanding', () => () => <main>County landing</main>);
jest.mock('./components/County/CountyIndividual/index.js', () => () => <main>County individual</main>);
jest.mock('./components/County/CountyCompare/index.js', () => () => <main>County compare</main>);
jest.mock('./components/County/CountyCompareSelection/index.js', () => () => <main>County compare selection</main>);
jest.mock('./components/Misconduct/Misconduct/index.js', () => () => <main>Misconduct search</main>);
jest.mock('./components/Misconduct/CrimeJudgeCompare/index.js', () => () => <main>Crime judge compare</main>);
jest.mock('./components/Judges/JudgesCountyCompare/index.js', () => () => <main>Judges compare selection</main>);
jest.mock('./components/Judges/JudgesLanding/index.js', () => () => <main>Judges landing</main>);
jest.mock('./components/Judges/JudgeCompareCrime/index.js', () => () => <main>Judge compare crime</main>);
jest.mock('./components/Crime/CrimeLanding/index.js', () => () => <main>Crime landing</main>);
jest.mock('./components/Crime/CrimeSearch/index.js', () => () => <main>Crime search</main>);
jest.mock('./components/Crime/CrimeIndividual/index.js', () => () => <main>Crime individual</main>);
jest.mock('./components/Spiel/Spiel/index.js', () => () => <main>Mission</main>);
jest.mock('./components/Spiel/Donate/index.js', () => () => <main>Donate</main>);
jest.mock('./components/Spiel/DataSets/index.js', () => () => <main>Data sets</main>);
jest.mock('./components/Spiel/Contact/index.js', () => () => <main>Contact</main>);

test('renders the app shell and landing route', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /judge/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /county/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /crime/i })).toBeInTheDocument();
  expect(screen.getByText(/quant justice landing/i)).toBeInTheDocument();
});
