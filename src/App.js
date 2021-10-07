import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from './components/Search';
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title: 'What is React?',
        content: 'React is a front-end javascript framework'
    },
    {
        title: 'Why use React?',
        content: 'React is a favorite JS library among engineers'
    },
    {
        title: 'How do you use React',
        content: 'You use React by creating Components'
    }
]

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    }
];


const App = () => {
    const [selected, setSelected] = useState(options[0]);
    const [showDropdown, setShowDropdown] = useState(true);

    return (
        <div>
            <Header />

            <Route path="/">
                <Accordion items={items} />
            </Route>

            <Route path="/search">
                <Search />
            </Route>

            <Route path="/dropdown">
                <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
                { showDropdown ?
                    <Dropdown
                        label="Select a Color"
                        selected={selected}
                        onSelectedChange={setSelected}
                        options={options}
                    /> : null
                }
            </Route>

            <Route path="/translate">
                <Translate />
            </Route>
        </div>

    );
}

export default App;


