import type { Locale } from '@/i18n/routing';

export type IconName =
  | 'server'
  | 'layers'
  | 'gauge'
  | 'flask'
  | 'terminal'
  | 'fileCog'
  | 'workflow'
  | 'shieldCheck'
  | 'box'
  | 'blocks'
  | 'puzzle'
  | 'refreshCw'
  | 'bot'
  | 'badgeCheck'
  | 'gem';

export type Accent = 'cyan' | 'gold' | 'blue';

export interface FeatureContent {
  /** Full title used on cards and detail pages. */
  title: string;
  /** Short, technical label rendered above the title. */
  tagline: string;
  /** One paragraph used by the feature grid. */
  summary: string;
  /** Concrete capabilities rendered as a bullet list. */
  bullets: string[];
  /** Representative code sample. */
  code: string;
  /** Language label rendered in the code block header. */
  codeLang: string;
}

export interface Feature {
  slug: string;
  order: number;
  icon: IconName;
  accent: Accent;
  content: Record<Locale, FeatureContent>;
}

export const features: Feature[] = [
  {
    slug: 'rust-powered-http-core',
    order: 1,
    icon: 'server',
    accent: 'cyan',
    content: {
      en: {
        title: 'Rust-powered HTTP core with a dual server interface',
        tagline: 'Granian engine · RSGI + ASGI',
        summary:
          'An ultra-fast engine built on Granian (ASGI/RSGI) delivers responses up to 10x faster than traditional Python frameworks. Ship on RSGI for maximum throughput or ASGI to reuse the existing async ecosystem (Uvicorn, Hypercorn, Daphne).',
        bullets: [
          'RSGI interface for the highest possible performance.',
          'ASGI compatibility with the existing Python async ecosystem.',
          'HTTP/1.1, HTTP/2 and streaming responses out of the box.',
        ],
        code: `from orionis.foundation import Application

app = Application()

@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}`,
        codeLang: 'python',
      },
      es: {
        title: 'Núcleo HTTP impulsado por Rust con doble interfaz de servidor',
        tagline: 'Motor Granian · RSGI + ASGI',
        summary:
          'Un motor ultrarrápido basado en Granian (ASGI/RSGI) ofrece respuestas hasta 10x más rápidas que los frameworks Python tradicionales. Usa RSGI para máximo rendimiento o ASGI para reutilizar el ecosistema asíncrono existente (Uvicorn, Hypercorn, Daphne).',
        bullets: [
          'Interfaz RSGI para el rendimiento más alto posible.',
          'Compatibilidad ASGI con el ecosistema asíncrono de Python.',
          'HTTP/1.1, HTTP/2 y respuestas en streaming desde el primer día.',
        ],
        code: `from orionis.foundation import Application

app = Application()

@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}`,
        codeLang: 'python',
      },
    },
  },
  {
    slug: 'clean-scalable-architecture',
    order: 2,
    icon: 'layers',
    accent: 'blue',
    content: {
      en: {
        title: 'Clean, scalable architecture with clear separation of concerns',
        tagline: 'IoC container · service providers · pipelines',
        summary:
          'An IoC container, service providers, middleware pipelines and facades keep your code organised and maintainable — from a small service to an application with thousands of routes. Every component owns a well-defined responsibility and lifecycle.',
        bullets: [
          'Layered architecture with explicit boundaries between components.',
          'Middleware pipelines composed and reordered declaratively.',
          'Grows linearly: the same patterns scale from MVP to monolith.',
        ],
        code: `container.singleton(Database, PostgresDatabase)

@app.middleware
class Authenticate:
    async def handle(self, request, next_handler):
        request.user = await Auth.guard("api").user()
        return await next_handler(request)`,
        codeLang: 'python',
      },
      es: {
        title: 'Arquitectura limpia y escalable con separación clara de responsabilidades',
        tagline: 'Contenedor IoC · proveedores · pipelines',
        summary:
          'Un contenedor IoC, proveedores de servicios, pipelines de middleware y fachadas mantienen el código organizado y mantenible, desde proyectos pequeños hasta aplicaciones con miles de rutas. Cada componente tiene una responsabilidad y un ciclo de vida bien definidos.',
        bullets: [
          'Arquitectura en capas con límites explícitos entre componentes.',
          'Pipelines de middleware compuestos y reordenados de forma declarativa.',
          'Escala de forma lineal: los mismos patrones sirven del MVP al monolito.',
        ],
        code: `container.singleton(Database, PostgresDatabase)

@app.middleware
class Authenticate:
    async def handle(self, request, next_handler):
        request.user = await Auth.guard("api").user()
        return await next_handler(request)`,
        codeLang: 'python',
      },
    },
  },
  {
    slug: 'extreme-throughput',
    order: 3,
    icon: 'gauge',
    accent: 'gold',
    content: {
      en: {
        title: 'Extreme throughput and superior performance',
        tagline: '455,000+ req/s · < 2 ms latency',
        summary:
          'Serialisation benchmarks show 2.6x the throughput of FastAPI and 6.6x that of Django. In TechEmpower Round 22 the framework reached more than 455,000 requests per second with an average latency below 2 ms.',
        bullets: [
          '2.6x the JSON serialisation throughput of FastAPI.',
          '6.6x the JSON serialisation throughput of Django.',
          '455k+ req/s with sub-2 ms average latency (TechEmpower R22).',
        ],
        code: `$ orionis benchmark --suite json --connections 512

  Requests/sec      455,312
  Latency (avg)     1.87 ms
  Latency (p99)     4.20 ms
  Transferred       91.4 MB/s`,
        codeLang: 'bash',
      },
      es: {
        title: 'Rendimiento superior y throughput extremo',
        tagline: '455.000+ req/s · latencia < 2 ms',
        summary:
          'Las pruebas de serialización JSON muestran un rendimiento 2.6x superior a FastAPI y 6.6x superior a Django. En TechEmpower Round 22 alcanzó más de 455.000 solicitudes por segundo con una latencia promedio menor a 2 ms.',
        bullets: [
          '2.6x el throughput de serialización JSON de FastAPI.',
          '6.6x el throughput de serialización JSON de Django.',
          '455k+ req/s con latencia promedio por debajo de 2 ms (TechEmpower R22).',
        ],
        code: `$ orionis benchmark --suite json --connections 512

  Solicitudes/seg   455.312
  Latencia media    1.87 ms
  Latencia (p99)    4.20 ms
  Transferido       91.4 MB/s`,
        codeLang: 'bash',
      },
    },
  },
  {
    slug: 'native-test-suite',
    order: 4,
    icon: 'flask',
    accent: 'cyan',
    content: {
      en: {
        title: 'Optimised native test suite',
        tagline: 'Async tests · DI · parallel runner',
        summary:
          'A first-class runner with expressive assertions, native support for asynchronous cases, dependency injection and parallel execution — no third-party tooling required.',
        bullets: [
          'Expressive assertions with diffs for nested payloads.',
          'Async test cases and dependency injection built in.',
          'Parallel execution and coverage without extra dependencies.',
        ],
        code: `from orionis.test import TestCase

class HealthTest(TestCase):
    async def test_health_returns_ok(self):
        response = await self.get("/health")
        response.assert_ok()
        response.assert_json({"status": "ok"})`,
        codeLang: 'python',
      },
      es: {
        title: 'Suite de pruebas nativa optimizada',
        tagline: 'Tests async · DI · ejecución paralela',
        summary:
          'Un runner de primera clase con aserciones expresivas, soporte nativo para casos asíncronos, inyección de dependencias y ejecución en paralelo, sin necesidad de herramientas externas.',
        bullets: [
          'Aserciones expresivas con diff para payloads anidados.',
          'Casos de prueba asíncronos e inyección de dependencias integrados.',
          'Ejecución en paralelo y cobertura sin dependencias adicionales.',
        ],
        code: `from orionis.test import TestCase

class HealthTest(TestCase):
    async def test_health_returns_ok(self):
        response = await self.get("/health")
        response.assert_ok()
        response.assert_json({"status": "ok"})`,
        codeLang: 'python',
      },
    },
  },
  {
    slug: 'reactor-cli',
    order: 5,
    icon: 'terminal',
    accent: 'gold',
    content: {
      en: {
        title: 'Reactor CLI — the intelligent command centre',
        tagline: 'One unified command line',
        summary:
          'A unified interface that handles distributed tasks, enterprise job processing, test execution and component generation from a single entry point.',
        bullets: [
          'Scaffolding for controllers, models, commands and jobs.',
          'Run queues, schedulers and test suites with one tool.',
          'Inspect routes, providers and the container at a glance.',
        ],
        code: `$ orionis make:controller User/ProfileController
$ orionis make:command SendInvoices
$ orionis schedule:work
$ orionis test --parallel`,
        codeLang: 'bash',
      },
      es: {
        title: 'Reactor CLI — el centro de comandos inteligente',
        tagline: 'Una línea de comandos unificada',
        summary:
          'Una interfaz unificada que gestiona tareas distribuidas, procesamiento de trabajos empresariales, ejecución de pruebas y generación de componentes desde un único punto de entrada.',
        bullets: [
          'Generación de controladores, modelos, comandos y jobs.',
          'Ejecuta colas, schedulers y suites con una sola herramienta.',
          'Inspecciona rutas, proveedores y el contenedor de un vistazo.',
        ],
        code: `$ orionis make:controller User/ProfileController
$ orionis make:command SendInvoices
$ orionis schedule:work
$ orionis test --parallel`,
        codeLang: 'bash',
      },
    },
  },
  {
    slug: 'declarative-configuration',
    order: 6,
    icon: 'fileCog',
    accent: 'blue',
    content: {
      en: {
        title: 'Clean declarative configuration in a single file',
        tagline: 'bootstrap/app.py',
        summary:
          'Configure the whole application — routes, middleware, schedulers, exception handlers and providers — explicitly in one central file, with no hidden or confusing conventions.',
        bullets: [
          'Everything is discoverable in bootstrap/app.py.',
          'No auto-magic and no hidden registration order.',
          'Environment driven values resolved by the config repository.',
        ],
        code: `# bootstrap/app.py
def create_app() -> Application:
    return (
        Application()
        .with_routing(
            web=[Path("/", module="app.http.web")],
            api=[Path("/v1", module="app.http.api")],
        )
        .with_middleware([TrustProxies, HandleCors])
        .with_exceptions({NotFoundError: NotFoundHandler})
    )`,
        codeLang: 'python',
      },
      es: {
        title: 'Configuración declarativa limpia en un solo archivo',
        tagline: 'bootstrap/app.py',
        summary:
          'Configura toda la aplicación — rutas, middleware, schedulers, manejadores de excepciones y proveedores — de forma explícita en un archivo central, sin configuraciones ocultas ni confusas.',
        bullets: [
          'Todo es descubrible en bootstrap/app.py.',
          'Sin magia oculta ni orden de registro implícito.',
          'Valores por entorno resueltos por el repositorio de configuración.',
        ],
        code: `# bootstrap/app.py
def create_app() -> Application:
    return (
        Application()
        .with_routing(
            web=[Path("/", module="app.http.web")],
            api=[Path("/v1", module="app.http.api")],
        )
        .with_middleware([TrustProxies, HandleCors])
        .with_exceptions({NotFoundError: NotFoundHandler})
    )`,
        codeLang: 'python',
      },
    },
  },
  {
    slug: 'async-first',
    order: 7,
    icon: 'workflow',
    accent: 'cyan',
    content: {
      en: {
        title: 'Native async-first architecture',
        tagline: 'async/await in every layer',
        summary:
          'Designed from the ground up around async/await — not bolted on. Routing, dependency injection and middleware are asynchronous by default, keeping average latency below 2 ms.',
        bullets: [
          'Async routing, middleware and dependency resolution.',
          'No blocking calls hidden inside the request lifecycle.',
          'Background tasks and queues share the same event loop.',
        ],
        code: `@app.get("/users/{user_id}")
async def show(user_id: int, repo: UserRepository) -> JSON:
    user = await repo.find_or_fail(user_id)
    await events.dispatch(UserViewed(user.id))
    return JSON(user)`,
        codeLang: 'python',
      },
      es: {
        title: 'Arquitectura Async-First nativa',
        tagline: 'async/await en cada capa',
        summary:
          'Diseñado desde cero en torno a async/await, no como una característica añadida. El enrutamiento, la inyección de dependencias y el middleware son asíncronos por defecto, manteniendo una latencia promedio por debajo de 2 ms.',
        bullets: [
          'Enrutamiento, middleware y resolución de dependencias asíncronos.',
          'Sin llamadas bloqueantes ocultas en el ciclo de la petición.',
          'Tareas de fondo y colas comparten el mismo event loop.',
        ],
        code: `@app.get("/users/{user_id}")
async def show(user_id: int, repo: UserRepository) -> JSON:
    user = await repo.find_or_fail(user_id)
    await events.dispatch(UserViewed(user.id))
    return JSON(user)`,
        codeLang: 'python',
      },
    },
  },
  {
    slug: 'security-by-design',
    order: 8,
    icon: 'shieldCheck',
    accent: 'gold',
    content: {
      en: {
        title: 'Security built in by default',
        tagline: 'OWASP aligned · auth · hashing · encryption',
        summary:
          'Protection aligned with OWASP compliance, integrated authentication and advanced middleware management from day one. The auth, encrypter and hashing modules cover guards, policies, tokens, remember-me, passwords and encryption.',
        bullets: [
          'Guards, policies and token based authentication.',
          'Argon2 hashing and AES encryption out of the box.',
          'Signed URLs, CSRF protection and security headers.',
        ],
        code: `Auth.guard("web").attempt(email, password, remember=True)

token = Auth.guard("api").create_token(user, ["read:invoices"])

Encrypter.encrypt(payload)   # AES-256-GCM
Hash.make(password)          # Argon2id`,
        codeLang: 'python',
      },
      es: {
        title: 'Seguridad integrada por defecto',
        tagline: 'Alineado a OWASP · auth · hashing · cifrado',
        summary:
          'Protección alineada con los estándares de cumplimiento de OWASP, autenticación integrada y gestión avanzada de middleware desde el primer día. Los módulos auth, encrypter y hashing cubren guards, políticas, tokens, remember-me, contraseñas y cifrado.',
        bullets: [
          'Guards, políticas y autenticación basada en tokens.',
          'Hashing Argon2 y cifrado AES de serie.',
          'URLs firmadas, protección CSRF y cabeceras de seguridad.',
        ],
        code: `Auth.guard("web").attempt(email, password, remember=True)

token = Auth.guard("api").create_token(user, ["read:invoices"])

Encrypter.encrypt(payload)   # AES-256-GCM
Hash.make(password)          # Argon2id`,
        codeLang: 'python',
      },
    },
  },
  {
    slug: 'ioc-container',
    order: 9,
    icon: 'box',
    accent: 'blue',
    content: {
      en: {
        title: 'IoC container with dependency injection',
        tagline: 'singleton · transient · scoped',
        summary:
          'Supports singleton, transient and scoped lifecycles and resolves dependencies automatically through type hints. Dependencies are declared on controllers, commands and tests — the container resolves them so you never look them up manually.',
        bullets: [
          'Automatic resolution driven by type annotations.',
          'Singleton, transient and request-scoped lifecycles.',
          'Fails fast with clear errors when a binding is missing.',
        ],
        code: `@app.post("/invoices")
async def store(
    payload: InvoicePayload,
    service: InvoiceService,          # resolved by the container
) -> JSON:
    return JSON(await service.create(payload), status=201)`,
        codeLang: 'python',
      },
      es: {
        title: 'Contenedor IoC con inyección de dependencias',
        tagline: 'singleton · transient · scoped',
        summary:
          'Soporta ciclos de vida singleton, transient y scoped, y resuelve dependencias automáticamente mediante type hints. Las dependencias se declaran en controladores, comandos y pruebas — el contenedor las resuelve y elimina la búsqueda manual.',
        bullets: [
          'Resolución automática guiada por anotaciones de tipo.',
          'Ciclos de vida singleton, transient y request-scoped.',
          'Falla rápido con errores claros cuando falta un binding.',
        ],
        code: `@app.post("/invoices")
async def store(
    payload: InvoicePayload,
    service: InvoiceService,          # resuelto por el contenedor
) -> JSON:
    return JSON(await service.create(payload), status=201)`,
        codeLang: 'python',
      },
    },
  },
  {
    slug: 'facades',
    order: 10,
    icon: 'blocks',
    accent: 'cyan',
    content: {
      en: {
        title: 'Facade system',
        tagline: 'Expressive, modular, async providers',
        summary:
          'Provides expressive, clean interfaces over the underlying services, simplifying the readability and maintenance of business code. A modular architecture with async register() and boot() methods distinguishes eager and deferred providers, so only what is needed is initialised.',
        bullets: [
          'Static facades over any container service.',
          'Async register() and boot() lifecycle methods.',
          'Eager and deferred providers for a fast cold start.',
        ],
        code: `class CacheProvider(ServiceProvider):
    async def register(self) -> None:
        self.app.singleton(CacheManager, FileCacheManager)

    async def boot(self) -> None:
        ...

Cache.put("metrics:daily", payload, ttl=3600)`,
        codeLang: 'python',
      },
      es: {
        title: 'Sistema de Facades (Fachadas)',
        tagline: 'Proveedores expresivos, modulares y async',
        summary:
          'Proporciona interfaces expresivas y limpias hacia los servicios subyacentes, simplificando la legibilidad y el mantenimiento del código de negocio. Una arquitectura modular con métodos register() y boot() asíncronos distingue proveedores eager y deferred, inicializando solo lo necesario.',
        bullets: [
          'Fachadas estáticas sobre cualquier servicio del contenedor.',
          'Métodos de ciclo de vida register() y boot() asíncronos.',
          'Proveedores eager y deferred para un arranque en frío veloz.',
        ],
        code: `class CacheProvider(ServiceProvider):
    async def register(self) -> None:
        self.app.singleton(CacheManager, FileCacheManager)

    async def boot(self) -> None:
        ...

Cache.put("metrics:daily", payload, ttl=3600)`,
        codeLang: 'python',
      },
    },
  },
  // FEATURES
];

/** All features, sorted by their curated order. */
export function getFeatures(): Feature[] {
  return [...features].sort((a, b) => a.order - b.order);
}

/** Resolve a single feature by slug. */
export function getFeature(slug: string): Feature | undefined {
  return features.find((feature) => feature.slug === slug);
}

/** Localised content for a feature. */
export function featureContent(feature: Feature, locale: Locale): FeatureContent {
  return feature.content[locale] ?? feature.content.en;
}
