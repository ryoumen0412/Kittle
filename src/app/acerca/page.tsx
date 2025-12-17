import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sobre mi - Kittle',
    description: 'El autor detras de esto.',
};

export default function AcercaPage() {
    return (
        <div className="animate-fadeIn">
            <section className="py-12 md:py-16 lg:py-20">
                <div className="container max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4">
                            Sobre mi
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)]">
                            No hay mucho que contar, pero aca va
                        </p>
                    </div>

                    {/* Content */}
                    <div className="card p-8 md:p-12">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-2xl font-serif font-semibold text-[var(--text-primary)] mb-4">
                                Quien escribe esto
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                                Escribo desde hace años. No porque crea que tengo algo especial que decir,
                                sino porque es lo unico que se hacer medianamente bien. O eso me gusta pensar.
                            </p>

                            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                                Este sitio existe porque necesitaba un lugar donde tirar lo que escribo.
                                Antes usaba carpetas en el escritorio. Esto es marginalmente mejor.
                            </p>

                            <h2 className="text-2xl font-serif font-semibold text-[var(--text-primary)] mb-4">
                                Que hay aca
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="p-4 rounded-lg bg-[var(--navy-800)] border border-[var(--navy-700)]">
                                    <h3 className="text-lg font-serif font-medium text-[var(--pink-neon)] mb-2">
                                        Historias
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Cosas que pasan. A veces a personas, a veces a nadie en particular.
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-[var(--navy-800)] border border-[var(--navy-700)]">
                                    <h3 className="text-lg font-serif font-medium text-[var(--orange-neon)] mb-2">
                                        Cuentos
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Lo mismo pero mas corto. O con dragones. Depende del dia.
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-[var(--navy-800)] border border-[var(--navy-700)]">
                                    <h3 className="text-lg font-serif font-medium text-[#8a7ab0] mb-2">
                                        Novelas
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Proyectos ambiciosos que probablemente nunca termine.
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-[var(--navy-800)] border border-[var(--navy-700)]">
                                    <h3 className="text-lg font-serif font-medium text-[var(--text-secondary)] mb-2">
                                        Blog
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Pensamientos sueltos sobre escribir. Y sobre no escribir.
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-serif font-semibold text-[var(--text-primary)] mb-4">
                                Las estrellas
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Puedes puntuar lo que leas. No cambia nada, pero me entero de que
                                alguien paso por aca. A veces eso ayuda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
