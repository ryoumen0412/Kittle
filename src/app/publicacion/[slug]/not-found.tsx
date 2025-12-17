import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="animate-fadeIn min-h-[60vh] flex items-center justify-center">
            <div className="container text-center">
                <h1 className="text-6xl md:text-8xl font-serif font-bold gradient-text mb-4">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-serif text-[var(--text-primary)] mb-4">
                    Publicacion no encontrada
                </h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                    Lo sentimos, la publicacion que buscas no existe o ha sido movida.
                </p>
                <Link href="/" className="btn-primary">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
