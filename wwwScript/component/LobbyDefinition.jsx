import React from 'react';
import CsrfToken from 'l4n-server/component/CsrfToken';

const FormInput = props => {
    const { name, type, className } = props;
    switch (type) {
        case 'string':
            return <input className={className} type="text" name={name} />;
        case 'number':
            return <input className={className} type="number" name={name} />;
        case 'select':
            return (
                <select className={className} name={name}>
                    {props.values.map(value => <option key={value.name}>{value.name}</option>)}
                </select>
            );
        default:
            return null;
    }
};

const FormItem = props => (
    <label className="formField">
        <span className="formField-label">{props.name}</span>
        <FormInput className="formField-input" {...props} />
    </label>
);

const LobbyDefinition = props => {
    const { game, children } = props;
    const { lobbyDefinition } = game;
    const formItems = Object.keys(lobbyDefinition).map(key => (
        <FormItem key={key} name={key} {...lobbyDefinition[key]} />
    ));

    return (
        <form method="POST">
            <CsrfToken {...props} />
            {children}
            {formItems}
            <label className="formField">
                <span className="formField-label" />
                <button type="submit">Create Lobby</button>
            </label>
        </form>
    );
};

export default LobbyDefinition;
