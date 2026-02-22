import { Link } from "wouter";
import { IntroBook } from "@/components/IntroBook";

export function Intro() {
    return (
        <div className="fixed inset-0 bg-quaresma-bg overflow-hidden">
            <IntroBook />
        </div>
    );
}

// Estilos antigos removidos para evitar conflitos com o design Stitch

