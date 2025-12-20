import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sobre mí - Kittle',
    description: 'El autor detrás de esto.',
};

export default function AcercaPage() {
    return (
        <div className="animate-fadeIn">
            <section className="py-12 md:py-16 lg:py-20">
                <div className="container max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-cyan)] mb-4 neon-glow-cyan">
                            Sobre mí
                        </h1>
                        <p className="text-base text-[var(--text-secondary)]">
                            No hay mucho que contar, pero aquí va
                        </p>
                    </div>

                    {/* Content */}
                    <div className="card p-8 md:p-12">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-base font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-magenta)] mb-4">
                                Quién escribe esto
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                                Escribo desde hace años. No porque crea que tengo algo especial que decir,
                                sino porque es lo único que sé hacer medianamente bien. O eso me gusta pensar.
                            </p>

                            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                                Este sitio existe porque necesitaba un lugar donde tirar lo que escribo.
                                Antes usaba carpetas en el escritorio. Esto es marginalmente mejor.
                            </p>

                            <h2 className="text-base font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-magenta)] mb-4">
                                Qué hay aquí
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="p-4 border-2 border-[var(--neon-pink)] bg-[rgba(255,20,147,0.1)]">
                                    <h3 className="text-sm font-[family-name:var(--font-pixel)] uppercase text-[var(--neon-pink)] mb-2">
                                        Historias
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Cosas que pasan. A veces a personas, a veces a nadie en particular.
                                    </p>
                                </div>

                                <div className="p-4 border-2 border-[var(--arcade-orange)] bg-[rgba(255,102,0,0.1)]">
                                    <h3 className="text-sm font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-orange)] mb-2">
                                        Cuentos
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Lo mismo pero más corto. O con dragones. Depende del día.
                                    </p>
                                </div>

                                <div className="p-4 border-2 border-[#b388ff] bg-[rgba(138,43,226,0.1)]">
                                    <h3 className="text-sm font-[family-name:var(--font-pixel)] uppercase text-[#b388ff] mb-2">
                                        Novelas
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Proyectos ambiciosos que probablemente nunca termine.
                                    </p>
                                </div>

                                <div className="p-4 border-2 border-[var(--arcade-cyan)] bg-[rgba(0,255,255,0.1)]">
                                    <h3 className="text-sm font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-cyan)] mb-2">
                                        Blog
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Pensamientos sueltos sobre escribir. Y sobre no escribir.
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-base font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-magenta)] mb-4">
                                Las estrellas
                            </h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Puedes puntuar lo que leas. No cambia nada, pero me entero de que
                                alguien pasó por aquí. A veces eso ayuda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
