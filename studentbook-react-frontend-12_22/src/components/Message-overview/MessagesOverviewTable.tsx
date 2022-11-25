import React from 'react';
import { Message } from '../../types';

type Props = {
    Messages: Array<Message>;
};

const MessagesOverviewTable: React.FC<Props> = ({ Messages }: Props) => {
    if (Messages.length == 0) {
        return <p className="font-weight-light p-3">Your friends have been quiet lately...</p>;
    } else {
        return (
            <div className="p-5 ">
                <section className="table table-striped  p-2 m-2 bg-secondary shadow  mb-5 bg-white rounded">
                    {Messages &&
                        Messages.map((Message, index) => (
                            <div key={index}>
                                <strong>{Message.author}</strong>
                                <p className="font-weight-light">{Message.tekst}</p>
                                <p id="datesent" className="text-right">
                                    {Message.datesent.slice(0, 19).replace('T', ' ')}
                                </p>
                            </div>
                        ))}
                </section>
            </div>
        );
    }
};

export default MessagesOverviewTable;
