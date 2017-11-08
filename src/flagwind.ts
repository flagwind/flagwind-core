export class Person
{
    public name: string;
    public age: number;
}

export class Student extends Person
{
    public constructor(name: string, age: number)
    {
        super();

        this.name = name;
        this.age = age;
    }
}