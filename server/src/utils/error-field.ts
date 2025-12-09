export default function getErrorField(path: string | null) {
    if(path === 'firstName') return 'fname';

    if(path === 'lastName') return 'lname';

    if(path === 'phoneNumber') return 'phone';

    if(path === 'email') return 'email';

    if(path === 'message') return 'message';

    return '';
}