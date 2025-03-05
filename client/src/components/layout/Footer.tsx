export default function Footer() {
    return (
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>GitHub Repo Explorer &copy; {new Date().getFullYear()}</p>
          <p className="mt-2">Cette application n'a pas été développée par GitHub. Il s'agit d'un projet indépendant.</p>
        </div>
      </footer>
    );
}


