FROM gitpod/workspace-base:latest

USER gitpod

ENV TRIGGER_REBUILD=1

# Install Node and other global dependencies
# Ref: https://github.com/gitpod-io/workspace-images/blob/main/chunks/lang-node/Dockerfile
ENV NODE_VERSION=18

RUN curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | PROFILE=/dev/null bash \
    && bash -c ". .nvm/nvm.sh \
        && nvm install v${NODE_VERSION} \
        && nvm alias default v${NODE_VERSION} \
        && npm install -g nx typescript pnpm" \
    && echo ". ~/.nvm/nvm-lazy.sh"  >> /home/gitpod/.bashrc.d/50-node

COPY --chown=gitpod:gitpod scripts/nvm-lazy.sh /home/gitpod/.nvm/nvm-lazy.sh

# Install .NET
# Ref: https://github.com/gitpod-io/workspace-images/blob/main/chunks/tool-dotnet/Dockerfile
RUN mkdir -p /home/gitpod/dotnet && curl -fsSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --version 7.0.400 --install-dir /home/gitpod/dotnet
ENV DOTNET_ROOT=/home/gitpod/dotnet
ENV PATH=/home/gitpod/dotnet:$PATH

RUN bash \
    && { echo 'if [ ! -z $GITPOD_REPO_ROOT ]; then'; \
        echo '\tCONTAINER_DIR=$(awk '\''{ print $6 }'\'' /proc/self/maps | grep ^\/run\/containerd | head -n 1 | cut -d '\''/'\'' -f 1-6)'; \
        echo '\tif [ ! -z $CONTAINER_DIR ]; then'; \
        echo '\t\t[[ ! -d $CONTAINER_DIR ]] && sudo mkdir -p $CONTAINER_DIR && sudo ln -s / $CONTAINER_DIR/rootfs'; \
        echo '\tfi'; \
        echo 'fi'; } >> /home/gitpod/.bashrc.d/110-dotnet
RUN chmod +x /home/gitpod/.bashrc.d/110-dotnet