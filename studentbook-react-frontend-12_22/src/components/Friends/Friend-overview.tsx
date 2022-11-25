import React from 'react';
import { User } from '../../types';

type Props = {
    Friends: Array<User>;
};

const FriendsOverviewTable: React.FC<Props> = ({ Friends }: Props) => {
    if (Friends.length == 0) {
        return <p className="font-weight-light">No friends added yet</p>;
    } else {
        return (
            <div className="ps-3 pe-3 ">
                <section className="table table-striped  p-2 ml-1 bg-secondary shadow  border border-dark  bg-white rounded">
                    {Friends &&
                        Friends.map((Friend, index) => (
                            <div key={index}>
                                <p className="font-weight-light">
                                    {Friend.name} - {Friend.status}
                                </p>
                            </div>
                        ))}
                </section>
            </div>
        );
    }
};

export default FriendsOverviewTable;
