import React, { useState } from 'react';
import { User } from '../../types';

type Props = {
    Users: Array<User>;
    setSelectedUser: (User: User) => void;
};

const UsersOverviewTable: React.FC<Props> = ({ Users, setSelectedUser }: Props) => {
    const [nameFilter, setNameFilter] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    return (
        <>
            <div className="col-4 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by name"
                    onChange={(event) => setNameFilter(event.target.value)}
                />
            </div>
            <div className="w-100 d-none d-md-block" />
            <div className="col-6">
                {Users && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th className="text-center" scope="col">
                                    Messages
                                </th>
                                <th className="text-center" scope="col">
                                    Friends
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Users &&
                                Users.filter(({ name }) =>
                                    name.toLowerCase().includes(nameFilter.toLowerCase())
                                ).map((User, index) => (
                                    <tr
                                        className={index === currentIndex ? 'table-active' : ''}
                                        onClick={() => {
                                            setSelectedUser(User);
                                            setCurrentIndex(index);
                                        }}
                                        key={index}
                                        role="button"
                                    >
                                        <td>{User.id}</td>
                                        <td>{User.name}</td>

                                        <td className="text-center">
                                            {User.Messages?.length || 0}
                                        </td>
                                        <td className="text-center">{User.friends?.length}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default UsersOverviewTable;
