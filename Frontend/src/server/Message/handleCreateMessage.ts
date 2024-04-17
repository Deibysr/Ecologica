import createMessage from './createMessage';

async function handleCreateMessage(content: string, forumId: number) {
    const token = 'your-user-token'; // Obtén el token de la sesión actual del usuario

    try {
        const newMessage = await createMessage({ forumId, content }, token);
        console.log(newMessage); // Procesa el mensaje como necesites
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
    }
}
