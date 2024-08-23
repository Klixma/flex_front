import React from "react";

function TextFields({
    id,
    label,
    setValueD,
    valueD,
    setValueT,
    valueT,
    onKeyDown,
}) {
    const getDataTextD = (e) => {
        setValueD(e.target.value);
    };
    const getDataTextT = (e) => {
        setValueT(e.target.value);
    };

    const today = new Date();
    //Date
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const formattedMonth = month.toString().padStart(2, "0");
    const day = today.getDate();
    const formattedDay = day.toString().padStart(2, "0");
    // Format the date as needed:
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    //Time
    const hours = today.getHours().toString().padStart(2, "0"); // Add leading zero if needed
    const minutes = today.getMinutes().toString().padStart(2, "0"); // Add leading zero if needed
    const seconds = today.getSeconds().toString().padStart(2, "0"); // Add leading zero if needed

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    React.useEffect(() => {
        valueD == "" ? setValueD(formattedDate) : setValueD(valueD);
        valueT == "" ? setValueT(formattedTime) : setValueT(valueT);
    }, [formattedDate, formattedTime, setValueD, setValueT, valueD, valueT]);

    return (
        <>
            <label htmlFor={id} className="form-label">
                {label}:
            </label>
            <div id={id} className="row" name={id}>
                <div className="col-md-6">
                    <input
                        onChange={(e) => getDataTextD(e, setValueD)}
                        type="date"
                        className="form-control form-control-sm"
                        placeholder={`Enter ${label}`}
                        value={valueD == "" ? formattedDate : valueD}
                        onKeyDown={onKeyDown}
                        required
                        disabled
                    />
                </div>
                <div className="col-md-6">
                    <input
                        onChange={(e) => getDataTextT(e, setValueT)}
                        type="time"
                        className="form-control form-control-sm"
                        placeholder={`Enter ${label}`}
                        value={valueT == "" ? formattedTime : valueT}
                        onKeyDown={onKeyDown}
                        required
                        disabled
                    />
                </div>
            </div>
        </>
    );
}

export default TextFields;
