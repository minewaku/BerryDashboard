import React from 'react';
import { Button } from '~/components/Button';
import { TextField } from '~/components/Input';

export const Test = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center gap-x-4">
            <Button variant="base">
                <div className="">Hallo Im Emu Otori</div>
            </Button>
            <Button variant="chip">
                <div className="">Hallo Im Emu Otori</div>
            </Button>
            <Button variant="transition">
                <div className="">Hallo Im Emu Otori</div>
            </Button>
            <Button variant="outlined">
                <div className="">Hallo Im Emu Otori</div>
            </Button>

            <TextField type="password" id="password" label="password" disabled={false}/>
        </div>
    );
};

export default Test;
