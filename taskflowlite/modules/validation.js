// ==============================
// Validate Task Input
// ==============================

export function validateTaskInput(task) {

    const text = task.trim();

    if (text === "") {

        return {
            isValid: false,
            message: "⚠️ Task cannot be empty."
        };

    }

    if (text.length < 3) {

        return {
            isValid: false,
            message: "⚠️ Task must contain at least 3 characters."
        };

    }

    if (text.length > 100) {

        return {
            isValid: false,
            message: "⚠️ Maximum 100 characters allowed."
        };

    }

    return {

        isValid: true,
        message: ""

    };

}