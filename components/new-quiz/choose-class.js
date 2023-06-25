import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Dropdown } from "@nextui-org/react";
import Image from "next/image";
import Logo from "@/public/logo/cnweb-30.png";

const API = process.env.NEXT_PUBLIC_API;

const ChooseClass = ({ classSelected, setClassSelected, handleSubmit, token }) => {
    const [classes, setClasses] = useState()
    const selectedValue = useMemo(() => classSelected.className, [classSelected]);

    const getClasses = async () => {
        try {
            await axios.get(
                `${API}/classes`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            ).then((res) => {
                setClasses(res.data.data)
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getClasses();
    });

    return (
        <>
            <h1>Create a new quiz</h1>
            <Image alt="logo" src={Logo}></Image>
            <form className="form" onSubmit={handleSubmit}>
                <label>First, choose a class to start</label>
                <Dropdown className="classes-choices">
                    <Dropdown.Button flat>
                        {selectedValue ? selectedValue : 'Choose a class'}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="primary"
                        items={classes}
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={classSelected.classID}
                    >
                        {classes?.map((data) => {
                            return <Dropdown.Item
                                key={data.subject}
                                style={{ display: 'flex' }}
                                description={`Class ID: ${data.codename}`}
                            >
                                <button
                                    onClick={() => {
                                        setClassSelected({
                                            classID: data._id,
                                            className: data.subject
                                        });
                                        console.log(classSelected);
                                    }}
                                >
                                    {data.subject}
                                </button>
                            </Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <button type="submit">Continue</button>
            </form>
        </>
    );
};

export default ChooseClass;
