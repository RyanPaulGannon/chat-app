use html_macro::html;
use leptos::*;
use leptos_meta::*;
use leptos_router::*;

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();

    view! {
        <Stylesheet id="leptos" href="/pkg/leptos_start.css"/>

        <Title text="Chat App"/>

        <Router>
            <main>
                <Routes>
                    <Route path="" view=HomePage/>
                    <Route path="/*any" view=NotFound/>
                </Routes>
            </main>
        </Router>
    }
}

#[component]
fn HomePage() -> impl IntoView {
    view! {
        <h1 class="app-heading">"Welcome to Chat App!"</h1>
        <div class="container">
            <div class="left">
                <Chat />
            </div>
            <div class="right">
                <Preview />
            </div>
        </div>
    }
}

#[component]
fn Chat() -> impl IntoView {
    struct ChatMessage {
        role: Option<String>,
        content: String,
        error: Option<String>,
    }

    view! {
        <div class="chat-container">
        <h1 class="chat-title">Chat</h1>

        <div class="chat-messages">
            // <div v-for="message in messages" :key="message.content" :class="{
            //     'user-message': message.role === 'user',
            //     'bot-message': message.role === 'bot',
            // }">
            //     {{ message.content }}
            // </div>
        </div>

        <div class="chat-input">
            <input class="message-input" placeholder="Type your message..." />
            <button class="send-button">Send</button>
        </div>
    </div>
    }
}

#[component]
fn Preview() -> impl IntoView {
    let component = view! { <p>Hello</p> };

    view! {
      <div class="preview">
          <h1 class="text-center">Preview</h1>
          <div class="html-container" id="htmlContainer"></div>
      </div>
    }
}

/// 404 - Not Found
#[component]
fn NotFound() -> impl IntoView {
    // set an HTTP status code 404
    // this is feature gated because it can only be done during
    // initial server-side rendering
    // if you navigate to the 404 page subsequently, the status
    // code will not be set because there is not a new HTTP request
    // to the server
    #[cfg(feature = "ssr")]
    {
        // this can be done inline because it's synchronous
        // if it were async, we'd use a server function
        let resp = expect_context::<leptos_actix::ResponseOptions>();
        resp.set_status(actix_web::http::StatusCode::NOT_FOUND);
    }

    view! {
        <h1>"Not Found"</h1>
    }
}
