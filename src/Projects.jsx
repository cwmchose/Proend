/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const p1 = {
  title: "C. Elegans Shows HbYX KO Successful",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  link: "www.google.com",
  authors: "Doe J, Bob L, Johnson B",
};
const p2 = {
  title: "HbYX Motif Identified on Proteasome",
  body: "Interdum posuere lorem ipsum dolor. Dui nunc mattis enim ut tellus elementum. Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Interdum posuere lorem ipsum dolor sit amet. Ut placerat orci nulla pellentesque dignissim enim sit amet venenatis. Nisi est sit amet facilisis magna etiam tempor. Purus semper eget duis at tellus at urna. Eu mi bibendum neque egestas congue. Massa placerat duis ultricies lacus sed. Sed arcu non odio euismod lacinia. Sed sed risus pretium quam vulputate dignissim suspendisse in. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Suspendisse potenti nullam ac tortor vitae. At in tellus integer feugiat scelerisque varius.",
  link: "www.google.com",
  authors: "Doe J, Bob L, Johnson B",
};

const projects = [p1, p2];

function Project({ data }) {
  const { title, body, link, authors } = data;

  return (
    <div>
      <h2>{title}</h2>
      <h3>{authors}</h3>
      <p>{body}</p>
      <Link className="table-button" to={link}>
        See Publication
      </Link>
    </div>
  );
}

function Projects() {
  return (
    <div className="page">
      <div className="container">
        <div className="info-container">
          <h1>Current and Past Projects</h1>
          {projects.map((p, i) => (
            <Project key={i} data={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
