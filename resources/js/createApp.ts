import {
    createApp as createClientApp,
    VNode,
    resolveDynamicComponent,
    h,
    Transition,
    provide,
} from 'vue'
import { RouterView } from 'vue-router'
import { createHead } from '@vueuse/head'
import { createRouter } from './router'
import { initSession, sessionSymbol } from './composable/useSessionData'
import { apiSymbol, initApi } from './composable/useApi'
import { createI18n } from './i18n'

export async function createApp({}) {
    const head = createHead()
    const router = createRouter()
    const session = initSession()
    const api = initApi(session)
    const i18n = createI18n()

    if (session.isLoggedIn) {
        try {
            await api.get('/auth/user').then((response: any) => {
                session.user = response.data
                session.userRole = response.data.permissions
            })
        } catch (e) {
            session.token = ''
            session.userRole = []
            session.user = ''
        }
    }

    const app = createClientApp({
        setup() {
            provide(sessionSymbol, session)
            provide(apiSymbol, api)
            return () => {
                const defaultSlot = ({ Component: _Component }: any) => {
                    const Component = resolveDynamicComponent(_Component) as VNode

                    return [
                        h(
                            Transition,
                            { name: 'fade-slow', mode: 'out-in' },
                            {
                                default: () => [h(Component)],
                            }
                        ),
                    ]
                }

                return [
                    h(RouterView, null, {
                        default: defaultSlot,
                    }),
                    // h(VReloadPrompt, { appName: 'Marillac' }),
                ]
            }
        },
    })

    app.use(head)
    app.use(router)
    app.use(i18n)

    return app
}
