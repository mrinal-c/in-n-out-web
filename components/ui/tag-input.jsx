import { cn } from "@/lib/utils";
import * as React from "react"
import { Textarea } from "./textarea";
import { Input } from "./input";
import { Button } from "./button";
import { X } from "lucide-react";

const TagInput = React.forwardRef(({ className, inputField, ...props }, ref) => {
    const { tags, settags, maxtags, placeholderWhenFull = 'Max tags reached', minLength, maxLength, allowDuplicates = false } = props;
    const [inputValue, setInputValue] = React.useState('');
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newTagText = inputValue.trim();
            if (minLength && newTagText.length < minLength) {
                console.warn('Tag is too short');
                // error
                return;
            }
            // Validate maxLength
            if (maxLength && newTagText.length > maxLength) {
                // error
                console.warn('Tag is too long');
                return;
            }
            if (
                newTagText &&
                (allowDuplicates || !tags.some((tag) => tag.text === newTagText)) &&
                (maxtags === undefined || tags.length < maxtags)
            ) {
                settags([...tags,newTagText ]);
            }
            setInputValue('');
        }
    }

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    }

    const handleTagClick = (e, index) => {
        e.preventDefault();
        console.log('io');
        settags(tags.filter((_, i) => i !== index));
    }
    return (


        <div
            ref={ref}
            className={cn(
                " w-full items-center rounded-md border border-input bg-background p-2 text-base ring-offset-background",
                className
            )}
        >
            {tags.map((tag, index) => {
                return (<Button variant="secondary" type="button" key={index} className="m-1 font-normal" onClick={(e) => handleTagClick(e, index)}>
                    {tag} <X />
                </Button>);
            })}
            <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border-0 h-5 inline-block bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 flex-1 w-fit" {...props}>
            </Input>
            {/* <Textarea></Textarea> */}
        </div>


    );
})
TagInput.displayName = "TagInput"

export { TagInput }
