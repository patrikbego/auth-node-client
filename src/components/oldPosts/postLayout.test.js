import React from 'react';
import PostLayout from './postLayout';
import {render, screen} from "@testing-library/react";

const user = {name: 'Patrik', surname: 'Bego', about:'Philosopher|Entrepreneur|Code and Life hacker', siteTitle: 'My new blog'};

it('renders layout component correctly', () => {
  const mockData = {
    mddata: "test",
    meta: {
      title: "fileName",
      description: "test description",
      keywords: "NI at the moment",
      image: "/images/profile.jpg"
    }
  }

  const tree = render(<PostLayout domov user={user} postData={mockData}/>);
  expect(tree).toMatchSnapshot();

  expect(
    screen.getByRole("heading", { name: "Bego Tips" })
  ).toBeInTheDocument();
});


