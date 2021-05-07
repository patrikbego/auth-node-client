import React from 'react';
import {render, screen} from "@testing-library/react";
import MainLayout from "./mainLayout";

it('renders layout component correctly', () => {
  const tree = render(<MainLayout domov />);
  expect(tree).toMatchSnapshot();

  expect(
    screen.getByRole("heading", { name: "Bego Tips" })
  ).toBeInTheDocument();
});


