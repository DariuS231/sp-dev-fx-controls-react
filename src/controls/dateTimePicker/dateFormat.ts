
export class DateFormat {
    private static _repeat(chr, count): string {
        var str = "";
        for (var x = 0; x < count; x++) { str += chr };
        return str;
    }
    private static _padL(str, width, pad): string {
        if (!width || width < 1)
            return str;

        if (!pad) pad = " ";
        var length = width - str.length
        if (length < 1) return str.substr(0, width);

        return (this._repeat(pad, length) + str).substr(0, width);
    }
    private static _padR(str, width, pad): string {
        if (!width || width < 1)
            return str;

        if (!pad) pad = " ";
        var length = width - str.length
        if (length < 1) str.substr(0, width);

        return (str + this._repeat(pad, length)).substr(0, width);
    }
    public static Format(date: Date, format?: string): string {
        if (!format)
            format = "MM/dd/yyyy";

        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        format = format.replace("MM", this._padL(month.toString(), 2, "0"));

        if (format.indexOf("yyyy") > -1)
            format = format.replace("yyyy", year.toString());
        else if (format.indexOf("yy") > -1)
            format = format.replace("yy", year.toString().substr(2, 2));

        format = format.replace("dd", this._padL(date.getDate().toString(), 2, "0"));

        var hours = date.getHours();
        if (format.indexOf("t") > -1) {
            if (hours > 11)
                format = format.replace("t", "pm")
            else
                format = format.replace("t", "am")
        }
        if (format.indexOf("HH") > -1)
            format = format.replace("HH", this._padL(hours.toString(), 2, "0"));
        if (format.indexOf("hh") > -1) {
            if (hours > 12) hours - 12;
            if (hours == 0) hours = 12;
            format = format.replace("hh", this._padL(hours.toString(), 2, "0"));
        }
        if (format.indexOf("mm") > -1)
            format = format.replace("mm", this._padL(date.getMinutes().toString(), 2, "0"));
        if (format.indexOf("ss") > -1)
            format = format.replace("ss", this._padL(date.getSeconds().toString(), 2, "0"));
        return format;
    }
}