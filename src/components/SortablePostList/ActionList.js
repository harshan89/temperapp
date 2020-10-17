import React from 'react'
import Action from './Action'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ActionList = (props) => {
    const { actions, timeTravel } = props;
    const actionsCommited = actions.sort((a, b) => b.id - a.id).map((action, key) => {
        const index = key;
        return (
            <CSSTransition
                key={index}
                timeout={1000}
                classNames="item"
            >
                <Action
                    key={index}
                    action={action}
                    index={index}
                    timeTravel={timeTravel}
                />
            </CSSTransition>
        )
    })
    return (
        <div>
            <TransitionGroup className="ActionList">
                {actionsCommited}
            </TransitionGroup>
        </div>
    );
}

ActionList.propTypes = {
    actions: PropTypes.array.isRequired,
    timeTravel: PropTypes.func.isRequired
}

export default ActionList;