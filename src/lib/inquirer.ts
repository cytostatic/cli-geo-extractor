import { confirm, input } from '@inquirer/prompts';

export const askImageFolderPath = async (): Promise<string> => {
    return await input({
        message: 'Enter image folder path:',
    }).then((answer) => {
        if (answer.startsWith('"') || answer.startsWith("'")) {
            answer = answer.slice(1);
        }
        if (answer.endsWith('"') || answer.endsWith("'")) {
            answer = answer.slice(0, -1);
        }
        return answer.trim();
    });
};

export const askConfirmation = async (): Promise<boolean> => {
    return await confirm({
        message: 'Add another image folder?',
        default: false,
    });
};